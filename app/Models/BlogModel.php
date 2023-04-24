<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogModel extends Model
{
    use HasFactory;
    protected $primaryKey = 'blog_id';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'foreign_key', 'user_id');
    }
}
