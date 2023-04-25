<?php

namespace Database\Seeders;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\BlogModel;
use App\Models\CommentModel;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    private $user = null;
    private $role = null;
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        app()['cache']->forget('spatie.permission.cache');
        Permission::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        Permission::firstOrCreate(['name' => 'Blogger', 'guard_name' => 'web']);
        $user = User::firstOrCreate([
            'email' => 'test@gmail.com',
        ], [
            'name' => 'Site Administer',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now(),
            'thumbnail' => fake()->imageUrl(
                100,
                100
            ),
            'remember_token' => Str::random(10)
        ]);
        $role = Role::firstOrCreate(['name' => 'Admin']);
        $permissions = Permission::where('name', 'Admin')->pluck('name')->toArray();
        $role->syncPermissions($permissions);
        $user->assignRole($role->name);
        $this->role = Role::firstOrCreate(['name' => 'Blogger']);
        $permissions = Permission::where('name', 'Blogger')->pluck('name')->toArray();
        $this->role->syncPermissions($permissions);
        User::factory(3)->create()->each(function ($user) {
            $this->user = $user;
            $this->user->assignRole($this->role->name);
            BlogModel::factory(fake()->randomNumber(1))->create(['user_id' => $user->user_id])->each(function ($blog) {
                CommentModel::factory(fake()->randomNumber(1))->create([
                    'user_id' => $this->user->user_id,
                    'blog_id' => $blog->blog_id
                ]);
            });
        });
    }
}
