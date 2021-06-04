export const getUser = async (req, res) => {
  try {
    res.json({
      msg: "/getUser",
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    res.json({
      msg: `/deleteUser ${id}`,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
