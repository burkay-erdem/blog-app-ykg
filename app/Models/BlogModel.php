<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogModel extends Model
{
    use HasFactory;
    protected $primaryKey = 'blog_id';
    protected $table = 'blogs';

    protected $fillable = [ 
        'tag',
        'title',
        'content',
        'date_start',
        'date_end',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
