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
            'title' => fake()->text(50), 
            'content' => fake()->text(),
            'date_start' => now(),
            'tag' => fake()->text(5),
            'thumbnail' => fake()->imageUrl(
                640,
                360
            ),
            'date_end' => now()->addDays(1),
            'like_count' => fake()->randomNumber(),
            'comment_count' => fake()->randomNumber()
            
        ];
    }
}
