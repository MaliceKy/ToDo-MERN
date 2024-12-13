import User from "../models/user.model.js";

// Sign in (checks user)
export const loginUser = async (req, res) => {
	const { username, password } = req.body;
  
	try {
	  const user = await User.findOne({ username });
  
	  if (user && user.matchPassword(password)) {

		// If user exists and password matches
		res.status(200).json({ success: true, data: user });
	  } 
	  else {
		res.status(401).json({ success: false, message: "Invalid username or password" });
	  }
	} catch (error) {
	  console.error("Error during login:", error);
	  res.status(500).json({ success: false, message: "Server error" });
	}
  };
