import { sendEmailNewsletter } from "../helpers/newsletter.mail";
import models from "./../database/models";

export async function subscribe(req, res) {
    try {
        const { email, firstName, lastName } = req.body;

        const subscriberRaw = await models.Newsletter.create({ email, firstName, lastName });

        const subscriber = subscriberRaw.toJSON();

        if (subscriber) {
            const text = `Thanks for subscribing<br><a href="${process.env.APP_URL_BACKEND}/newsletter/verify?id=${subscriber.id}"
                target="_blank"
                rel="noopener noreferrer">
                <span
                style="color:#979dad;font-family:Roboto,Arial,sans-serif;font-size:15px;line-height:20px;text-align:center;text-decoration:underline">Verify</span></a>`;
            await sendEmailNewsletter(email, "Newsletter subscription confirmation", text, subscriber.id);

            return res.status(201).json({ message: "success", data: subscriber });
        }
        else return res.status(400).json({ error: "Could not add this user" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function unsubscribe(req, res) {
    try {
        const id = req.query.id;

        const response = await models.Newsletter.update({ active: false }, { where: { id } },);

        const subscriber = (await models.Newsletter.findOne({ where: { id } })).toJSON();

        if (response) {
            await sendEmailNewsletter(subscriber.email, "Newsletter unsubscription confirmation", "You have successfully unsubscribed to our newsletter", subscriber.id);
            return res.status(200).json({ message: "Unsubscribed to newsletter" });
        }
        else return res.status(400).json({ error: "Could not unsubscribe. Try again later." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function verifySubscriber(req, res) {
    try {
        const id = req.query.id;

        const response = await models.Newsletter.update({ verified: true, active: true }, { where: { id } });
        const subscriber = (await models.Newsletter.findOne({ where: { id } })).toJSON();

        if (response) {
            await sendEmailNewsletter(subscriber.email, "Newsletter verification confirmation", "You have successfully verified your email address and have subscribed to our newsletter", subscriber.id);
            return res.status(200).json({ message: "Email verified." });
        }
        else return res.status(400).json({ error: "Could not unsubscribe. Try again later." });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteSubcriberByAdmin(req, res) {
    try {
        const id = req.body.id;

        const response = await models.Newsletter.destroy({ where: { id } });

        if (response) return res.status(200).json({ message: "Subscriber deleted." });
        else return res.status(400).json({ error: "Could not delete subscriber. Try again later." });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function unsubscribeByAdmin(req, res) {
    try {
        const id = req.body.id;

        const response = await models.Newsletter.update({ active: false }, { where: { id } });

        const subscriber = (await models.Newsletter.findOne({ where: { id } })).toJSON();


        if (response) {
            await sendEmailNewsletter(subscriber.email, "Unsubscription from newsletter", `Hello ${subscriber.firstName},<br>Our team have decided to suspend you from receiving email notifications. Please contact our support team.`, subscriber.id);
            return res.status(200).json({ message: "Subscriber suspended by Admin" });
        }
        else return res.status(400).json({ error: "Could not suspend subscriber. Try again later." });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getSubscriberByAdminByEmail(req, res) {
    try {
        const email = req.params.email;
        const subscriber = await models.Newsletter.findOne({ where: { email } });

        if (subscriber) return res.status(200).json({ message: "success", subscriber: subscriber.toJSON() });
        else return res.status(400).json({ error: "Could not get subscriber" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getSubscribersByAdmin(req, res) {
    try {
        const subscribersRaw = await models.Newsletter.findAll();

        const subscribers = subscribersRaw.map(subscriber => subscriber.toJSON());


        if (subscribers) return res.status(200).json({ message: "success", subscribers });
        else return res.status(400).json({ error: "Could not get subscribers" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}