<?php
defined('BASEPATH') or exit('No direct script access allowed');

require_once(APPPATH . '/libraries/REST_Controller.php');

use Restserver\libraries\REST_Controller;


class UsuariosInfo extends REST_Controller
{


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
		if (isset($data['id'])) {
			$todos = array();
			// LIKE
			$name = "name";
			$id= $data['id'];
			$usuario = $this->db->query("SELECT * FROM `users` where id = " . $id);
			$query = $this->db->query('SELECT * FROM `users_photos` where u_id = ' . $id);
			$fotos = array();
			$perfil = "hola";
            foreach ($query->result() as $row) {
                if ($row->profile === "1") {
                    $perfil = $row->photo;
                }
                if ($row->story > 0) {
                    $story = $this->db->query('SELECT * FROM `users_story` where id = ' . $row->story);
                }
                if ($row->approved !== "2") {
                    array_push($fotos, $row);
                }
            }
			// birthday
			$usuario= $usuario->result()[0];
			$respuesta = array(
				'error' => FALSE,
				'credits' => $usuario->credits,
				'join_date' => $usuario->join_date,
				'premium' => $usuario->premium,
				'id_usuario' => $usuario->id,
				'country'=> $usuario ->country,
				'age' => $usuario->age,
				'birthday' => $usuario->birthday,
				'bio' => $usuario->bio,
				'name' => $usuario->name,
				'photo_profile' => $perfil,
				'email' => $usuario->email,
				'fotos' => $fotos,	
				//	'story' =>  $story->result()
			);
			$this->response($respuesta);

		
		
			
		} else {
			$respuesta = array(
				'error' => true,
				'termino' => "vacio",
			);
			$this->response($respuesta);
		}
	}
	public function todos_get()
	{

		// $pagina = $pagina * 10;

		$query = $this->db->query('SELECT * FROM `users` ');

		$respuesta = array(
			'error' => FALSE,
			'productos' => $query->result_array()
		);

		$this->response($respuesta);
	}


}
