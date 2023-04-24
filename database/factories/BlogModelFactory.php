<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogModel>
 */
class BlogModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(), 
            'content' => fake()->text(),
            'date_start' => now(),
            'thumbnail' => fake()->imageUrl(),
            'date_end' => now()->addDays(1),
            'like_count' => fake()->randomNumber(),
            'comment_count' => fake()->randomNumber()
            
        ];
    }
}
