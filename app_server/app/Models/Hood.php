<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hood extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'city_id'
    ];

    function city(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    function clientFiles(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ClientFile::class);
    }
}
