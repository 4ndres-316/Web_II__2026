<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
//datos de conexion a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "petshop";

//variable de conexion
$conn = new mysqli($servername, $username, $password, $dbname);
//verificar conexion
if($conn -> connect_error){
    http_response_code(500);
    die(json_encode(["error" => "conexion mala", $conn -> connect_error]));
}

//metodos get post put delete
$method = $_SERVER["REQUEST_METHOD"];
switch($method){
    case "GET":
        $id=$_GET["id"] ?? null;
        if($id){
            $stnt=$conn->prepare("SELECT * FROM clientes WHERE id=?");//esta es la consulta
            $stnt->bind_param("s",$id);
            $stnt->execute();//ejecutamos la consulta
            $result=$stnt->get_result();
            $cliente=$result->fetch_assoc();
            //en caso de pruebas por consola
            echo json_encode($cliente);
        }else{
            $result=$conn->query("SELECT * FROM clientes");
            $clientes=[];
            while($row=$result->fetch_assoc()){
                $clientes[]=$row;
            }
            //en caso de pruebas por consola
            echo json_encode($clientes);
        }
        break;
    case "POST":
        $input=json_decode(file_get_contents("php://input"),true);//leemos y decodificamos
        $id=$input["id"] ?? rand(100000, 999999);
        $nombre=$input["nombre"];
        $email=$input["email"];
        $stnt=$conn->prepare("INSERT INTO clientes (id,nombre,email) VALUES(?,?,?)");//esta es la consulta
        $stnt->bind_param("sss",$id,$nombre,$email);
        if($stnt->execute()){
            http_response_code(201);//creado correctamente
            //en caso de pruebas por consola
            echo json_encode(["message"=>"creado exitosamente", "id"=>$id]);
        }else{
            http_response_code(500);
            echo json_encode(["message"=>"error al crear"]);
        }
        break;
    case "PUT":
        $input=json_decode(file_get_contents("php://input"),true);//leemos y decodificamos
        $id=$input["id"];
        $nombre=$input["nombre"];
        $email=$input["email"];
        $stnt=$conn->prepare("UPDATE clientes SET nombre=?, email=? WHERE id=?");//esta es la consulta
        $stnt->bind_param("sss",$nombre,$email,$id);
        if($stnt->execute()){
            http_response_code(201);
            //en caso de pruebas por consola
            echo json_encode(["message"=>"actualizado exitosamente"]);
        }else{
            http_response_code(500);
            echo json_encode(["error"=>"error al actualizar"]);
        }
        break;
    case "DELETE":
        $id=$_GET["id"] ?? null;
        $stnt=$conn->prepare("DELETE FROM clientes WHERE id=?");//esta es la consulta
        $stnt->bind_param("s",$id);
        if($stnt->execute()){
            //en caso de pruebas por consola
            echo json_encode(["message"=>"eliminado exitosamente"]);
        }else{
            http_response_code(500);
            echo json_encode(["error"=>"error al eliminar"]);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(["error"=>"todo mal"]);
        break;
}
$conn->close();
?>