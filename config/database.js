import mysql from 'mysql2'
import {config} from '../config/config.js'

// create the connection to the database
const pool = mysql.createPool(config)

export default pool;