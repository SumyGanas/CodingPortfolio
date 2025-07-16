const AboutMe = () =>
{
    const data = 
    `
    <style>
    p {
      text-align: justify;
    }

    </style>
    
    <p> 
        I am a software developer living in San Jose, CA. I am ready to start work as soon as possible and will not require any sponsorship or relocation assistance. </br> </br> This portfolio features 2 projects highlighting different parts of my skillset. Each

        project also includes an architecture diagram and a write-up that documents my code. </br></br>

        The first project is an fully automated trading bot that places and executes trades daily in realtime. The trading data is displayed on a line chart next to the candlestick chart that

        tracks the performance of SPY. </br></br> The second project is an AI powered tool that tracks daily sales and discounts on the retail website 'Ulta' and uses Google's Gemini AI to analyse

        the discounts based on user selected preferences or general value. </br></br> These projects demonstrate my ability to create full stack web apps that utilize public APIs as well as

        my ability to provide effective code documentation. They also display my experience with creating backend cloud infrastructure, a skill I acquired via Google Cloud's 

        Associate Cloud Engineer certification. My background in business has provided me with a lot of experience with navigating the corporate aspects of an engineering job that 

        involve creating an effective product that aligns with the company vision and creates satisfied customers. Combined with the aforementioned technical skills, 

        I present a well-rounded skillset that can perform technical as well as business related job tasks.

    </p>

    `;

return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default AboutMe;
