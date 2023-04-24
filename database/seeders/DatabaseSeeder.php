<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\BlogModel;
use App\Models\CommentModel;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    private $user = null;
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::factory(3)->create([
            'password' => Hash::make('123456')
        ])->each(function ($user) { 
                $this->user = $user;
                BlogModel::factory(fake()->randomNumber(1))->create(['user_id' => $user->user_id ])->each(function($blog){
                    CommentModel::factory(fake()->randomNumber(2))->create([
                        'user_id' => $this->user->user_id,
                        'blog_id' => $blog->blog_id
                    ]);
                });
            });
    }
}
