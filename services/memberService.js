const memberRepository = require('../repository/memberRepository');

const memberService = {
  getProjectMembers: getProjectMembers,
  deactivateMember: deactivateMember,
  activateMember: activateMember,
};

module.exports = memberService;

async function getProjectMembers(req, res) {
  const { projectId } = req.params;
  try {
    const project = await memberRepository.getProjectMembers(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(project.members);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deactivateMember(req, res) {
  const { projectId, userId } = req.body;
  try {
    const project = await memberRepository.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const member = project.members.find((member) => member.userId.equals(userId));
    if (!member) return res.status(404).json({ message: 'Member not found' });

    member.isActive = false;
    await project.save();
    res.status(200).json({ message: 'Member deactivated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function activateMember(req, res) {
  const { projectId, userId } = req.body;
  try {
    const project = await memberRepository.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const member = project.members.find((member) => member.userId.equals(userId));
    if (!member) return res.status(404).json({ message: 'Member not found' });

    member.isActive = true;
    await project.save();
    res.status(200).json({ message: 'Member activated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
