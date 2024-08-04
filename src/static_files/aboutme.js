const AboutMe = () =>
{
    const data = 
    `
    <style>
    a {
      color: #eb52a1;

    }

    p {
      text-align: justify;
    }

    </style>

    <p>My name is Sumaiya (Sumy) Ganas and I am University of Windsor Alumni with a Bachelor's in Business Administration. I 
    currently live in Richmond, Virginia but I'm willing to move pursuant of job opportunities. This website is a portfolio that contains all my side projects and relevant links to my Github and LinkedIn pages. Thanks for visiting!</p>
    `;

return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default AboutMe;