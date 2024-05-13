<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [];


    function clientFiles(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ClientFile::class);
    }
}
