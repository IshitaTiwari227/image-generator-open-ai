const axios = require("axios");

const apiKey = "OzWGnCgcfwadqgnDPyhaPcSP5Rtk4hUwR9FihZbUQONhPzDCmR3kRSctIFAZ";
const numberOfPics = "1"; //Limitation of 4 maximum image generation per call observed.

const generateImage = async (req, res) => {
  const { prompt } = req.body;

  const bodyInfo = JSON.stringify({
    key: apiKey,
    prompt: prompt,
    negative_prompt:
      "((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime",
    width: "512",
    height: "512",
    samples: numberOfPics,
    num_inference_steps: "30",
    safety_checker: "no",
    enhance_prompt: "yes",
    seed: null,
    guidance_scale: 7.5,
    webhook: null,
    track_id: null,
  });

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    console.log("Generating Images....");
    console.log("");
    const result = await axios.post(
      "https://stablediffusionapi.com/api/v3/text2img",
      bodyInfo,
      options
    );

    const imageUrl = result.data.output[0];

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

module.exports = { generateImage };
