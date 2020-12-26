import './HomeStyles.scss'

import MainImage from '../../images/people-cooking-kitchen.jpg'
import Section1Image from '../../images/deconstructed-food.jpg'

function Home() {
  return (
    <div id="home_container">
      <main>
        <img src={MainImage} id="main__main_image" alt="Cooking illustration"/>
        <div id="main__content">
        <p className="title" id="main__main_text">Recipes to make your day <span className="text_highlight">special</span></p>
        <span id="main__secondary_text">Search for 250+ recipes</span>
        </div>
      </main>
      <section>
        <img src={Section1Image} id="section1__image" alt="Ingredients"/>
        <p className="title">Clear <span className="text_highlight">instructions</span> and a tutorial video in each recipe</p>
      </section>
    </div>
  )
}
export default Home