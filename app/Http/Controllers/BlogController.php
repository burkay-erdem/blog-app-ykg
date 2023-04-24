<?php

namespace App\Http\Controllers;

use App\Models\BlogModel;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\BlogResource;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{

    public function blogs(Request $request): Response
    {
        $blogs =  BlogModel::paginate(2);
        return Inertia::render('Welcome', [
            'status' => session('status'),
            'blogs' =>  $blogs
        ]);
    }

    public function myBlogs(Request $request): Response
    {
        $blogs =  BlogModel::where('user_id', $request->user()->user_id)->paginate(2);
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
    public function store(StoreBlogRequest $request)
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
    public function show(BlogModel $blogModel)
    {

        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogModel $blogModel)
    {
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
    public function destroy(BlogModel $blogModel)
    {
        //
    }
}
