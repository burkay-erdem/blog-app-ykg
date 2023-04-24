<?php

namespace App\Http\Controllers;

use App\Models\BlogModel;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\BlogResource;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $blogs = BlogModel::where('user_id',$user->user_id)->get();
        return response([
            'status' => true,
            'message' => 'create new blog',
            'data' =>  $blogs
        ]);

        //
    }
    public function blogs()
    {
        $blogs =  BlogModel::paginate(2);
        // return BlogResource::collection($blogs);
        return response([
            'status' => true,
            'message' => 'get all blogs',
            'data' => $blogs
        ]);
        //
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {

        return response([
            'status' => true,
            'message' => 'create new blog',
            'data' => $request
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
