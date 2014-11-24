<?php
require_once('conf.php');

class Database
{
	// access parameters 
	private $_host = SQL_HOST;
	private $_port = SQL_PORT;
	private $_login = SQL_USER;
	private $_pwd = SQL_PASSWORD;
	private $_base = SQL_BDD;
	//var database
	private $_db;

	function __construct()
	{
		$this->_db = mysql_connect($this->_host.':'.$this->_port, $this->_login, $this->_pwd);

		if(!$this->_db)
		{
		   print "erreur connection $this->_db";
		   exit;
		}

		// choosing database
		if(!mysql_select_db($this->_base, $this->_db))
		{
			print "erreur ".mysql_error()."<br>";
			mysql_close($this->_db);
			exit;
		}

		mysql_set_charset('utf8', $this->_db);
	}

	function getDb()
	{
		return $this->_db;
	}
}
?>