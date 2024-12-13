import User from "../models/user.model.js";

// Sign in (checks user)
export const loginUser = async (req, res) => {
	const { username, password } = req.body;
  
	try {
	  const user = await User.findOne({ username, password });
	  console.log('Found user:', user);
  
	  if (user) {
		console.log('Flag value:', user.flag);
  
		return res.json({ 
		  success: true, 
		  data: { 
			_id: user._id,
			username: user.username,
			flag: user.flag || "CTF{BabyOil}"
		  }
		});
	  } else {
		return res.status(401).json({ success: false, message: "Invalid username or password" });
	  }
	} catch (error) {
	  console.error("Error during login:", error);
	  return res.status(500).json({ success: false, message: "Server error" });
	}
  };
