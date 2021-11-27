import React from 'react';
import Toolbar from "../components/toolbar";
import '../styles/about.module.less'
import Head from "next/head";

export default function About() {
    return (
        <>
            <Head>
                <title>About Thinkinary</title>
            </Head>
            <Toolbar noShadow={true} minimize={false} />
            <main className="pb-8 md:pb-24 pt-8">
                <section className="header">
                    <img src="images/logo.png" alt="logo"/>
                    <h1 className="text-theme-primary font-krona">About Thinkinary</h1>
                </section>
                <section className="body-text mx-auto px-6 md:w-3/4">
                    <p>
                        We at Thinkinary are interested in creating a safe space for writers and for readers.
                        A space where we can engage with ideas and ideologies that are important to us and where we can
                        also share our perspective.
                        A space where reading is at the same time educating, edifying, entertaining and cool.
                    </p>

                    <p>
                        We are also aware that in our context, a lot of what is written has a strange disconnect from
                        our realities.
                        That will be because we have very few writers, especially among the youthful population.
                        And we are interested in changing that. We are interested in giving a platform for everyone who
                        thinks he/she has anything to say.
                        We will like to see this platform grow into the birthplace of new writing talents who contribute
                        their plus to universal knowledge,
                        who bring more perspective into our day-day realities and who provide a sure source of
                        edutainment for a large and diverse audience.
                    </p>

                    <p>
                        This is our own way of making reading and writing popular. This is the demystification of
                        reading.
                        We generally want to see more people; especially the youths become great “fans of words”, boost
                        the reading
                        culture and bring people together around discussions that matter.
                    </p>

                    <p>
                        Lastly, we also want to uncover writing talent, those persons who can write but are worried
                        about “where to write”,
                        those that have never tried and those that have stopped writing. This is your home. Writers will
                        even be able to earn
                        money by hosting their literary works on our store thereby exposing them to a ready market. Sort
                        of, an El Dorado for readers and writers.
                    </p>
                </section>
            </main>
        </>
    );
}