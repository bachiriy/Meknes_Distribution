<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    private $roles = [
        'admin',
        'sub-admin'
    ];

    private $adminPermissions = [
        'view dashboard',
        'update user role',
        'user list',
        'add user',
        'delete user',
        'client list',
        'create client',
        'delete client',
        'clientFolder list',
        'create clientFolder',
        'update clientFolder',
        'delete clientFolder',
        'see statistics'
    ];

    private $subAdminPermissions = [
        'view dashboard',
        'client list',
        'create client',
        'delete client',
        'clientFolder list',
        'create clientFolder',
        'update clientFolder',
        'delete clientFolder',
    ];

    public function run(): void
    {
        foreach ($this->adminPermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        foreach ($this->roles as $role) {
            Role::create(['name' => $role]);
        }

        Role::findByName('admin')->givePermissionTo($this->adminPermissions);
        Role::findByName('sub-admin')->givePermissionTo($this->subAdminPermissions);
    }
}
