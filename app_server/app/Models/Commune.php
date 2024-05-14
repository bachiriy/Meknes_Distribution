<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    function caidat(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Caidat::class);
    }

    function clientFiles(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ClientFile::class);
    }
}
