<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientPartner extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_file_id',
        'client_id'
    ];
}
