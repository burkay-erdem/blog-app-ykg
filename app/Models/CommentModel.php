<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommentModel extends Model
{
    use HasFactory;
    protected $primaryKey = 'comment_id';

    protected $fillable = [ 
        'comment',
        'user_id',
        'blog_id',
         
    ];
    protected $table = 'comments';

    public function blog(): BelongsTo
    {
        return $this->belongsTo(BlogModel::class, 'blog_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
