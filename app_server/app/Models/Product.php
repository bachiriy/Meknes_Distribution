<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'designation',
        'image',
        'prix_tarif',
        'prix_achat',
        'prix_vente',
        'marge_brut',
        'remise',
        'TVA',
        'prix_vente_net',
        'category_id',
        'group_id'
    ];


    function clientFiles(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ClientFile::class);
    }

    function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    function group(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
