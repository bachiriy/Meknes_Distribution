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


    function clientFile(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(ClientFile::class);
    }

    function invoice(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Invoice::class);
    }

    function deliveryNote(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(DeliveryNote::class);
    }

    function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    function group(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    function supplier(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
}
