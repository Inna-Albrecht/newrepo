<?php
defined('BASEPATH') or exit('No direct script access allowed');

require_once(APPPATH . '/libraries/REST_Controller.php');

use Restserver\libraries\REST_Controller;


class Login extends REST_Controller
{

	//url principal - http://localhost/apiRest/index.php
	public function __construct()
	{

		header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
		header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
		header("Access-Control-Allow-Origin: *");


		parent::__construct();
		$this->load->database();
	}


	public function index_post()
	{

		$data = $this->post();

		if (
			!isset($data['password'])
			&& !isset($data['email'])
		) {

			$respuesta = array(
				'error' => TRUE,
				'mensaje' => 'La información enviada no es válida'
			);
			$this->response($respuesta, REST_Controller::HTTP_BAD_REQUEST);
			return;
		}

		// Tenemos correo y contraseña en un post
		$condiciones = array(
			'email' => $data['email']
		);
		$query = $this->db->get_where('users', $condiciones);
		$usuario = $query->row();

		if (!isset($usuario)) {
			$respuesta = array(
				'error' => TRUE,
				'mensaje' => 'Correo invalido'
			);
			$this->response($respuesta);
			return;
		}
		// AQUI!, tenemos un usuario y contraseña
		// TOKEN
		// $token = bin2hex( openssl_random_pseudo_bytes(20)  );
		$token = hash('ripemd160', $data['email'] . $data['password']);
		// Guardar en base de datos el token
		$this->db->reset_query();
		$actualizar_token = array('bio_url' => $token);
		$this->db->where('id', $usuario->id);
		$hecho = $this->db->update('users', $actualizar_token);
		//traer todas la fotos 
		$query = $this->db->query('SELECT * FROM `users_photos` where u_id = ' . $usuario->id);
		$fotos = array();
		$perfil = "hola";
		foreach ($query->result() as $row) {
			if ($row->profile === "1") {
				$perfil = $row->photo;
			}
			if($row->story>0){
				$story = $this->db->query('SELECT * FROM `users_story` where id = ' . $row->story);
			}
			array_push($fotos, $row);
		}
		$respuesta = array(
			'error' => FALSE,
			'credits'=> $usuario->credits,
			'premium'=> $usuario->premium,
			'token' => $token,
			'id_usuario' => $usuario->id,
			'name' => $usuario->name,
			'photo_profile' => $perfil,
			'email' => $usuario->email,
			'fotos' => $fotos,
		//	'story' =>  $story->result()
		);
		$this->response($respuesta);
	}

	public function actualizarL_post()
	{

		$data = $this->post();
		$condi = array('celular' => $data['celular']);
		$this->db->where($condi);
		$query = $this->db->get("login");
		$existe = $query->row();
		$condicion = array('nombre' => $data['nombre'], 'apellido' => $data['apellido'], 'direccion' => $data['direccion'], 'celular' => $data['celular']);


		if (!isset($data['nombre']) or !isset($data['apellido']) or !isset($data['direccion']) or !isset($data['celular'])) {
			$respuesta = array(
				'error' => true,
				'mensaje' => 'campo vacio'
			);

			$this->response($respuesta);
			return;
		}
	}
}
