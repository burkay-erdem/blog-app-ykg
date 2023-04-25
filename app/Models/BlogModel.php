<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogModel extends Model
{
    use HasFactory;
    protected $primaryKey = 'blog_id';
    protected $table = 'blogs';

    protected $fillable = [
        'tag',
        'user_id',
        'thumbnail',
        'title',
        'content',
        'date_start',
        'date_end',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function comments(): HasMany
    {
        return $this->hasMany(CommentModel::class, 'blog_id');
    }
    public function likes(): HasMany
    {
        return $this->hasMany(LikeModel::class, 'blog_id');
    }
    public function myLike() {
        return $this->hasMany(LikeModel::class, 'blog_id');
    }
}
