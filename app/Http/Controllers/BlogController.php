<?php

namespace App\Http\Controllers;

use App\Models\BlogModel;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\BlogResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect; 

class BlogController extends Controller
{
    private $pagination_limit = 5;

    public function blogs(Request $request): Response
    {
        $blogs =  BlogModel::query()
            ->with('user')
            ->paginate($this->pagination_limit);

        return Inertia::render('Welcome', [
            'status' => session('status'),
            'blogs' =>  $blogs
        ]);
    }

    public function index(Request $request): Response
    {
        $blogs =  BlogModel::where('user_id', $request->user()->user_id)->paginate($this->pagination_limit);


        return Inertia::render('Blog/List', [
            'status' => session('status'),
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
    public function store(StoreBlogRequest $request): Response
    {

        return response([
            'status' => true,
            'message' => 'create new blog',
            'result' => $request
        ]);
        $blog = BlogModel::create([
            'first_name' => 'Taylor',
            'last_name' => 'Otwell',
            'title' => 'Developer',
        ]);
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request): Response
    {
        $blog = BlogModel::where('blog_id', $request->get('blog_id'))->with('user')->first();

        return Inertia::render('Blog/Detail', [
            'status' => session('status'),
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
            'status' => session('status'),
            'blog' => $blog
        ]);
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, BlogModel $blogModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogModel $blog,Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
 

        $blog->delete();

        return Redirect::route('blog.index');
    }
}
