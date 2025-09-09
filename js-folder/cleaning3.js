// import { createClient } from '@supabase/supabase-js'

// 🔹 Replace with YOUR values from Supabase Project Settings → API
const SUPABASE_URL = "https://qitewsgbwhvayhhlcqud.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpdGV3c2did2h2YXloaGxjcXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNTM2NTIsImV4cCI6MjA3MjYyOTY1Mn0.zeBbI8MENQTrkxzwG4GKXvHQ8SOUt4qBDxsSCw7iBEU";


const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



// Upload handler
document.getElementById("submit-btn").addEventListener("click", async (e) => {
  e.preventDefault();


  let x = document.getElementsByClassName("input3")

  const image = document.getElementById("imageUpload")
  const image_file = image.files[0];
  const name = x[1].value;
  const description = x[2].value;
  const location = x[3].value;
  const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  // console.log(image_file)
  // console.log(name)
  // console.log(description)
  // console.log(location)
  console.log(date)

  //  Upload to storage bucket "photo"

  const filePath = `reports/${Date.now()}-${image_file.name}`;

  const { data, error } = await supabaseClient.storage
    .from("photo")
    .upload(filePath, image_file);

  if (error) {
    alert("❌ Upload failed!");
    console.error(error);
    return;
  }

  // Get public URL for preview / save to table
  const { data: urlData } = supabaseClient.storage
    .from("photo")
    .getPublicUrl(filePath);

  console.log("✅ Uploaded! Public URL:", urlData.publicUrl);
  alert("✅ Success! Image uploaded.");


  // Save into table "test"

  const { error: insertError } = await supabaseClient
    .from("Argha")
    .insert([
      {
        des: description,
        loc: location,
        img_url: urlData.publicUrl,
        date: date
      }
    ]);


  if (insertError) {
    alert(" Failed to save record!");
    console.error(insertError);
  } else {
    alert(" Success! Saved to Supabase.");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

});


