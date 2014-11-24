<?php
	require_once('conf.php');
	$m = new Model();
	$code = $_POST['code'] ? $_POST['code'] :'null';
	switch ($code) {
		case 'getDataByID':
			$id = $_POST['data']['id'] ? $_POST['data']['id'] : 'null';
			if($id!=null){
				$m->getDataByID(array('id'=>$id));
			}
			break;
		case 'getAllData':
				$m->getAllData();
			break;
		case 'update':
			$id = $_POST['data']['id'] ? $_POST['data']['id'] : 'null';
			$num = $_POST['data']['num'] ? $_POST['data']['num'] : 'null';
			$str = $_POST['data']['str'] ? $_POST['data']['str'] : 'null';
			if($id!=null){
				$m->update(array('id'=>$id,'num'=>$num,'str'=>$str));
			}
			break;
		case 'insert':
			$num = $_POST['data']['num'] ? $_POST['data']['num'] : 'null';
			$str = $_POST['data']['str'] ? $_POST['data']['str'] : 'null';
			$m->insert(array('num'=>$num,'str'=>$str));
		break;
		case 'delete':
			$id = $_POST['data']['id'] ? $_POST['data']['id'] : 'null';
			if($id!=null){
				$m->delete(array('id'=>$id));
			}
		break;
		
		default:
			echo("Error : code");
			break;
	}

class Model {
	protected $database;
	protected $db;
	protected $table = "dataset";
	protected $key = "id_dataset";

	function Model(){
		$this->database = new Database();
		$this->db = $this->database->getDb();
	}

	function getAllData(){
		$sql = "SELECT *
			FROM ".$this->table."
			WHERE 1";
		$result = mysql_query($sql,$this->db);
		if($result){
			$out="[";
			while($row = mysql_fetch_assoc($result)){
				if ($out != "[") {$out .= ",";}
				$out.='{"id_dataset":"'.$row['id_dataset'].'",';
				$out.='"number":"'.$row['number'].'",';
				$out.='"string":"'.$row['string'].'"}';
			}
			$out .=']';
			echo($out);
		}else{
			echo("Error : Select Request \n");
			echo($sql);
			die ("\nerr:".mysql_error());
		}
	}

	function getDataByID($arg){
		$sql = " SELECT *
			FROM ".$this->table."
			WHERE ".$this->key."=".$arg['id'];
		$result = mysql_query($sql,$this->db);
		if($result){
			$out="[";
			while($row = mysql_fetch_assoc($result)){
				if ($out != "[") {$out .= ",";}
				$out.='{"id_dataset":"'.$row['id_dataset'].'",';
				$out.='"number":"'.$row['number'].'",';
				$out.='"string":"'.$row['string'].'"}';
			}
			$out .=']';
			echo($out);
		}else{
			echo("Error : Select Request \n");
			echo($sql);
			die ("\nerr:".mysql_error());
		}
	}

	/*
	 * arg{str,num,id}
	 */
	function update($arg){
		$sql = "UPDATE ".$this->table;
		if($arg['num'] && $arg['str']){
			$sql .= " SET number = ". $arg['num']. ", string = '". $arg['str']."'";	
		}else if($arg['num']){
			$sql .= " SET number = ". $arg['num'];	
		}else{
			$sql .= " SET string = ". $arg['str'];
		}
		$sql .= " WHERE ".$this->key."=".$arg['id'];

		if(mysql_query($sql,$this->db)){
			echo('Update request done successfully');
		}else{
			echo("Error : Update Request \n");
			echo($sql);
			die ("\nerr:".mysql_error());
		}
	}

	function insert($arg){
		$sql = "INSERT INTO ".$this->table.
       " (number, string) ".
       "VALUES (".$arg['num'].",'".$arg['str']."')";

		if(mysql_query($sql,$this->db)){ 
       		echo('Insert request done successfully');
   		}else{
			echo("Error : Insert Request \n");
			echo($sql);
			die ("\nerr:".mysql_error());
		}
	}

	function delete($arg){
		$sql = "DELETE FROM ".$this->table.
			" WHERE ".$this->key."=".$arg['id'];
		if(mysql_query($sql,$this->db)){ 
			echo('Delete request done successfully');
		}else{
			echo("Error : Delete Request \n");
			echo($sql);
			die ("\nerr:".mysql_error());
		}
	}
}
?>