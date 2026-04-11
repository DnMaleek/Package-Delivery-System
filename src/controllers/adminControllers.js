const path = require("path");
const db = require("../config/db")

/* FUNCTIONS */

const generateTrackingId = async (db) => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);

  const dateKey = `${day}${month}${year}`;

  // Check if date exists
  const [rows] = await db.promise().query(
    "SELECT count FROM tracking_counter WHERE date = ?",
    [dateKey]
  );

  let counter = 1;

  if (rows.length > 0) {
    counter = rows[0].count + 1;

    await db.promise().query(
      "UPDATE tracking_counter SET count = ? WHERE date = ?",
      [counter, dateKey]
    );
  } else {
    await db.promise().query(
      "INSERT INTO tracking_counter (date, count) VALUES (?, ?)",
      [dateKey, counter]
    );
  }

  // Convert to base36
  let suffix = counter.toString(36).toUpperCase().padStart(3, '0');

  return `PKT-${dateKey}-${suffix}`;
};

/* CONTROLLERS */

const postDashboard = (req,res) =>{
    const {userId,password} = req.body;

    if( !userId || !password ) {
        res.status(400).json({message:'All fields are required'})
    return;
     }

   const sqlquery = "SELECT * FROM USER WHERE userId=? AND password=?"

   db.query(sqlquery,[userId,password],(err,result) => {
        if (err) throw err;

        if(result.length>0){
            return res.status(200).json({status:true, url:"/admin/dashboard"})
        } else {
            res.status(401).json({message:"Invalid credentials"})
        }
        
   })

}

const getDashboard = (req,res) => {
    res.sendFile(path.join(__dirname,'../../public','dashboard.html'))
}

const getParcels = (req,res) => {
    res.sendFile(path.join(__dirname,'../../public','parcels.html'))
}

const getDrivers = (req,res) => {
    res.sendFile(path.join(__dirname,'../../public','drivers.html'))
}

const postParcels = async (req, res) => {
  const {
    senderName,
    senderContact,
    receiverName,
    receiverContact,
    pickupLocation,
    destinationLocation,
    weight,
    size,
    description
  } = req.body;

  if (
    !senderName || !senderContact || !receiverName || !receiverContact ||
    !pickupLocation || !destinationLocation || !weight || !size || !description
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // 🔥 Generate ID
    const trackingId = await generateTrackingId(db);

    const sqlquery = `
      INSERT INTO parcels 
      (trackingId, senderName, senderContact, receiverName, receiverContact,
       pickupLocation, destinationLocation, weight, size, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.promise().query(sqlquery, [
      trackingId,
      senderName,
      senderContact,
      receiverName,
      receiverContact,
      pickupLocation,
      destinationLocation,
      weight,
      size,
      description
    ]);

    res.status(201).json({
      message: "success",
      trackingId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllparcels = async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM parcels ORDER BY create_time DESC");
    
    res.json({
      success: true,
      data: rows
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const postDrivers = (req,res) =>{
  const { fullName,
          phoneNumber,
          vehicleNumber,
          companyName,
          status,
          startLocation,
          destinationLocation
        } = req.body

  const sqlquery = `INSERT INTO drivers 
  (fullName,phoneNumber,vehicleNumber,companyName,status,startLocation,
  destinationLocation) VALUES (?,?,?,?,?,?,?)`

  db.query(sqlquery,[fullName,
          phoneNumber,
          vehicleNumber,
          companyName,
          status,
          startLocation,
          destinationLocation],(err,result) => {
        if (err) throw err;

        if(!err){
            return res.status(200).json({message:"Driver added sucessfully"})
        } else {
            res.status(401).json({message:"Internal server Error"})
        }})

}

const getAlldrivers = async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM drivers ORDER BY create_time DESC");
    
    res.json({
      success: true,
      data: rows
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {postDashboard,getDashboard,getParcels,getDrivers,postParcels,getAllparcels,postDrivers,getAlldrivers};