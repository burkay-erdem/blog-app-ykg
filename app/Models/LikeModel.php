<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LikeModel extends Model
{
    use HasFactory;


    protected $primaryKey = 'like_id';

    protected $fillable = [ 
        'user_id',
        'blog_id',

    ];
    protected $table = 'likes';

    public function blog(): BelongsTo
    {
        return $this->belongsTo(BlogModel::class, 'blog_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
