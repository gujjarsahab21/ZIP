import Member from '../models/member.js';  // Ensure this model exists for member data
import Payment from '../models/Payment.js'; // Ensure this model exists for payment data

const getDashboardData = async (req, res) => {
  try {
    const { status, renewalStatus, startDate, endDate } = req.query;
    let filterConditions = {};

    if (status) {
      filterConditions.membershipStatus = status;
    }

    if (renewalStatus) {
      filterConditions.renewalStatus = renewalStatus;
    }

    if (startDate && endDate) {
      filterConditions.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    console.log("Filter Conditions:", filterConditions);

    const totalMembers = await Member.find(filterConditions).countDocuments();
    const activeMembers = await Member.find({ ...filterConditions, membershipStatus: 'active' }).countDocuments();
    const pendingRenewals = await Member.find({ ...filterConditions, renewalStatus: 'pending' }).countDocuments();

    console.log("Total Members:", totalMembers);
    console.log("Active Members:", activeMembers);
    console.log("Pending Renewals:", pendingRenewals);

    const totalPayments = await Payment.aggregate([
      { $group: { _id: null, totalPayments: { $sum: '$amount' } } },
    ]);

    console.log("Total Payments:", totalPayments);

    res.status(200).json({
      totalMembers,
      activeMembers,
      pendingRenewals,
      totalPayments: totalPayments[0]?.totalPayments || 0,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};



export default { getDashboardData };  // Correct export syntax
