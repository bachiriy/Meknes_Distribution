<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientFileAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_address',
        'commune_id'
    ];

    protected $table = 'client_file_address';

    function commune(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }
}
