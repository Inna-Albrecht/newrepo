<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class Autenticacion implements FilterInterface
{

    public function before(RequestInterface $request)
    {
        if (empty($_SERVER['PHP_AUTH_USER'])) {
            die('Estas en servicio');
        } else {
            $username = $_SERVER['PHP_AUTH_USER'];
            $password = $_SERVER['PHP_AUTH_PW'];
            echo 'nombre :' . $username;
            echo 'contraseña :' . $password;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response)
    {
    }
}
