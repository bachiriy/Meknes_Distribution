<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cercle extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'pref_prov_id'
    ];

    function province(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    function caidats(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Caidat::class);
    }
}
