<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'region_id'
    ];

    function region(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    function cercles(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Cercle::class);
    }
}
