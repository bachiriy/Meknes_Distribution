<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_number',
        'product_id',
        'is_deleted'
    ];


    function product() {
        return $this->belongsToMany(Product::class);
    }
}
