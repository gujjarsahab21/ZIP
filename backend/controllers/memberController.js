import Member from '../models/member.js'; // Correct model for members

const getMembers = async (req, res) => {
  try {
    const { search, page = 1 } = req.query;

    // Define how many members to show per page
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Build the query for search
    let query = {};
    if (search) {
      query = { $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]};
    }

    // Fetch members from the database with pagination and search
    const members = await Member.find(query).skip(skip).limit(pageSize);

    // Count total members matching the query
    const totalMembers = await Member.countDocuments(query);

    // Send response with members and total count
    res.status(200).json({
      success: true,
      members,
      totalMembers,
      page,
      totalPages: Math.ceil(totalMembers / pageSize),
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export default getMembers;
