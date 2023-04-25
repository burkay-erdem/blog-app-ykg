<?php

namespace App\Http\Controllers;

use App\Models\BlogModel;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\BlogResource;
use App\Models\CommentModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    private $pagination_limit = 5;


    protected function permissions($permitionName): bool
    {
        if (Auth::user()) {
            return Auth::user()->hasPermissionTo($permitionName);
        }
        return false;
    }
    public function blogs(Request $request): Response
    {
        $blogs =  BlogModel::query()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($this->pagination_limit);

        return Inertia::render('Welcome', [
            'isAdmin' =>  $this->permissions('Admin'),
            'blogs' =>  $blogs
        ]);
    }

    public function index(Request $request): Response
    {
        $blogs =  BlogModel::where('user_id', $request->user()->user_id)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($this->pagination_limit);

        return Inertia::render('Blog/List', [
            'isAdmin' =>  $this->permissions('Admin'),
            'isBlogger' =>  $this->permissions('Blogger'),
            'blogs' =>  $blogs
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Blog/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request): RedirectResponse
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'content' => ['required'],
            'tag' => ['required'],
            'thumbnail' => ['required'],
        ])->validate();

        $insertData = [
            ...$request->post(),
            'user_id' => $request->user()->user_id
        ];
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $fileName = time() . '.' . $file->extension();

            $file->move(public_path('uploads'), $fileName);
            $url = '/uploads/' . $fileName;
            $insertData['thumbnail'] = $url;
        }
        BlogModel::create($insertData);
        return Redirect::route('blog.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request): Response
    {

        $blog = BlogModel::where('blog_id', $request->get('blog_id'))
            ->with('user')
            ->with(['comments' => function ($q) {
                $q->with('user')->orderBy('created_at', 'desc');
            }])
            ->first();

        return Inertia::render('Blog/Detail', [
            'isAdmin' =>  $this->permissions('Admin'),
            'blog' => $blog
        ]);

        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogModel $blog)
    {
        return Inertia::render('Blog/Form', [
            'blog' => $blog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreBlogRequest $request, BlogModel $blog): RedirectResponse
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'content' => ['required'],
            'tag' => ['required'],
            'thumbnail' => ['required'],
        ])->validate();

        $updateData = $request->post();
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $fileName = time() . '.' . $file->extension();

            $file->move(public_path('uploads'), $fileName);
            $url = '/uploads/' . $fileName;
            $updateData['thumbnail'] = $url;

            $path = public_path() . $blog->thumbnail;
            if (file_exists($path)) {
                unlink($path);
            }
        }

        $blog->fill($updateData)->save();
        return Redirect::route('blog.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogModel $blog, Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);


        $blog->delete();

        return Redirect::back();
    }


    public function comment(Request $request): RedirectResponse
    {
        Validator::make($request->post(), [
            'comment' => ['required'],
            'user_id' => ['required'],
            'blog_id' => ['required'],
        ])->validate();

        CommentModel::create($request->post());
        return Redirect::route('blog.detail', ['blog_id' => $request->post('blog_id')]);
    }
}
