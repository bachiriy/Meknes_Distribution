<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caidat extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cercle_id'
    ];

    function cercle(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Cercle::class);
    }

    function communes(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Commune::class);
    }
}
