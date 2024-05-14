<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'CIN_ICE',
        'type',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address_exploitation',
        'suite_address_exploitation',
        'address_facturation',
        'suite_address_facturation',
    ];


    function clientFiles(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(ClientFile::class, 'client_partners');
    }
}
