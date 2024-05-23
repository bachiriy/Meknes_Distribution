<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Client extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'CIN_ICE',
        'CIN_file',
        'type',
        'role',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address_exploitation',
        'suite_address_exploitation',
        'address_facturation',
        'suite_address_facturation',
        'is_deleted'
    ];


    function clientFiles(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(ClientFile::class, 'client_partners');
    }
}
