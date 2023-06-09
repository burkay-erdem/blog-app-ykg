<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [BlogController::class, 'blogs'])->name('home');
 
Route::get('/blogs', [BlogController::class, 'blogs'])->name('blogs');
Route::get('/blog/detail', [BlogController::class, 'show'])->name('blog.detail');




Route::middleware(['auth'])->group(function () { 

 
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/users', [UserController::class, 'index'])->name('user.list');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
    
    Route::post('/blog/{blog}/update', [BlogController::class, 'update'])->name('blog.update');
    Route::post('/comment', [BlogController::class, 'comment'])->name('comment.store');
    Route::post('/like', [BlogController::class, 'like'])->name('like.store');
    Route::delete('/like/{like}', [BlogController::class, 'unLike'])->name('like.destroy');
    Route::resource('blog', BlogController::class)->except(['update']);

});
 

require __DIR__ . '/auth.php';
