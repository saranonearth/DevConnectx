const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    create or update user profile
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    // Build profile object

    const ProfileFields = {};

    ProfileFields.user = req.user.id;
    if (company) ProfileFields.company = company;
    if (website) ProfileFields.website = website;
    if (location) ProfileFields.location = location;
    if (bio) ProfileFields.bio = bio;
    if (status) ProfileFields.status = status;
    if (githubusername) ProfileFields.githubusername = githubusername;

    if (skills) {
      ProfileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Build social fields
    ProfileFields.social = {};
    if (youtube) ProfileFields.social.youtube = youtube;
    if (twitter) ProfileFields.social.twitter = twitter;
    if (facebook) ProfileFields.social.facebook = facebook;
    if (linkedin) ProfileFields.social.linkedin = linkedin;
    if (instagram) ProfileFields.social.instagram = instagram;
    console.log('done till here');
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: ProfileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create
      profile = new Profile(ProfileFields);
      await profile.save();
      console.log('I am here');
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).json('Server Error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user_id
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).json('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo -remove users posts

    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is requires')
        .not()
        .isEmpty(),
      check('company', 'Company is requires')
        .not()
        .isEmpty(),
      check('from', 'From is requires')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const NewExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(NewExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
