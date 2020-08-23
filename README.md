# Pool

## Inspiration
We live in a stress-filled society where the average person has over 70,000 thoughts racing through their head every day, but rarely do we ever stop and truly explore those thoughts in a constructive way. Studies show that just 15 minutes of expressive writing a day can lower blood pressure, improve liver functionality, and can even increase productivity by up to 23%. Social media has become the default outlet for self-expression, but it’s clear that social media has become a toxic space for many, which is why we created Pool.

## What it does
Pool encourages you to track your daily thoughts in a safe personal space. Almost like a personal, private Twitter with a strong focus on self-reflection. Daily thoughts can be added by typing or talking to the app. You can continue adding or modifying your thoughts until midnight; after that, it’ll be preserved as an uneditable thought.

To view your thoughts, you have the option to sort thoughts by most recent, or through a feature called on-this-day which will show you thoughts from the same date across years, months, or weeks. For example, if I pick Monday, August 17, then I can see thoughts I had every Monday, every 17th of each month, or every August 17th of each year. The app is also able to identify whether a thought's sentiment is positive, neutral, or negative (along with a confidence percentage), allowing you to easily identify and reflect on the different emotions in past thoughts.

## How we built it
Pool's frontend was built on React Native and Expo using Javascript. We designed our prototypes and assets on Figma and Photoshop, then used libraries like React Navigation and Axios for API calls to bring those designs to life. Finally we deployed our app using Snack for everyone to use. 

Our REST API endpoints for submitting and fetching thoughts were built using Autocode which allowed us to bootstrap quickly and deploy painlessly. We used a relational database in the form of a Postgres instance hosted in the Azure Cloud for data storage. We made heavy use of Azure Cognitive Services: firstly, we connected our backend to  the Text Analysis APIs  for Sentiment Analysis  and Key Phrase Extraction; then, we connected our mobile app to the Speech-to-Text service to allow users to transcribe their thoughts in real time by speaking--a more natural form of expression.

## Challenges we ran into
The biggest challenge we had this weekend was deciding which features to prioritize. So many ideas and so little time! The team overestimated how much we could accomplish in this short time frame, but we addressed this problem by reprioritizing with all team members and narrowing down our design to the most impactful features.

## Accomplishments that we're proud of
Working together as a team! We were mostly strangers coming into this hackathon, so being able to incorporate everyone's strengths - design, frontend, backend, product direction - together to create a holistic project is something that we are all extremely proud of.

Also, the most important accomplishment, not pulling an all-nighter!

## What we  learned
We learned how to use React Native and Expo, design using Figma, created an API using Autocode, and dug extensively into Azure Cognitive Services. We all experimented with new technologies this weekend and had lots of fun doing it.

## What's next for Pool
We have so many unrealized designs! Here are some features we would like to implement next:
* Stream View and Overview
* Keywords View - word clouds
* Analytics - to track trends
* Dark mode!


Thank you to everyone who helped us this weekend and for making this virtual HackThe6ix an unforgettable event!

-- Alex, Emily, Sally, Shazz
