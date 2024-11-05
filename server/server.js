const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 4200;
const knex = require('knex');
const HTTP_STATUS = require('./HTTP_STATUS');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET_KEY = 'syedhammadali';

const clients = [];
const packages = [];
const trainers = [];
const vouchers = [];
const banners = [];

app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname, '../dist')));

app.use(bodyParser.json({ limit: '10mb' }));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('*', (req, res, next) => {
    try {
        req.db = knex({
            client: 'pg',
            connection: {
                port: 5432,
                host: 'localhost',
                user: 'postgres',
                password: 'postgres',
                database: 'test_data',
            },
        });
        next();
    } catch (error) {
        console.log('failed to connect to database');
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            message: 'internal server error',
        });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await req.db('user').where({ email }).first();

        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send({
                message: 'Invalid Credentials',
                statusCode: HTTP_STATUS.UNAUTHORIZED,
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send({
                message: 'Invalid Password',
                statusCode: HTTP_STATUS.UNAUTHORIZED,
            });
        }

        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

        return res.status(HTTP_STATUS.OK).send({
            message: 'Login successful',
            statusCode: HTTP_STATUS.OK,
            data: { email: user.email, accessToken },
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            message: 'Server error',
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        });
    }
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await req
                .db('user')
                .insert({
                    email: email,
                    password: hashedPassword,
                })
                .returning('id');
        } catch (error) {
            console.log('error', error);
            if (error.code === '23505') {
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
                    message: 'email already exist',
                    statusCode: HTTP_STATUS.CONFLICT,
                });
            }
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
                message: error.detail ?? error.message,
                statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            });
        }

        return res.status(HTTP_STATUS.CREATED).send({
            message: 'User registered successfully',
            statusCode: HTTP_STATUS.CREATED,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            message: 'Server error',
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        });
    }
});

app.use('/api/clients', (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send({
                message: 'Authorization token is required',
                statusCode: HTTP_STATUS.UNAUTHORIZED,
            });
        }
        const token = req.headers.authorization.replace('Bearer ', '');
        console.log('token', token);
        const user = jwt.verify(token, SECRET_KEY);
        console.log('🚀 ~ app.use ~ user:', user);
        req.session = {};
        req.session.user = user;
        next();
    } catch (error) {
        console.log('error', error);
        return res.status(HTTP_STATUS.UNAUTHORIZED).send({
            message: error.message,
            statusCode: HTTP_STATUS.UNAUTHORIZED,
        });
    }
});

app.get('/api/clients', async (req, res) => {
    try {
        const clients = await req.db('client');
        if (HTTP_STATUS.OK)
            return res.send({
                data: clients,
                message: 'clients fetched successfully',
                statusCode: HTTP_STATUS.OK,
            });
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching clients',
        });
    }
});

app.get('/api/clients', async (req, res) => {
    const { id } = req.body;

    try {
        const client = await req.db('client').where({ id }).returning('id');
        if (client) {
            return res.status(HTTP_STATUS.OK).json(client);
        }
    } catch (error) {
        console.error('Error fetching client:', error);

        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching client',
            error: error.message,
        });
    }
});

app.post('/api/clients', async (req, res) => {
    const {
        name,
        member_id,
        trainer,
        enrollment_number,
        phone,
        registration_date,
        package_type,
        weight,
        height,
        medical_issue,
        goal,
        cnic,
        exercise,
        email,
        image,
    } = req.body;

    try {
        const newClients = await req
            .db('client')
            .insert({
                name: name,
                member_id: member_id,
                phone: phone,
                registration_date: registration_date,
                trainer: trainer,
                enrollment_number: enrollment_number,
                package_type: package_type,
                weight: weight,
                height: height,
                medical_issue: medical_issue,
                goal: goal,
                cnic: cnic,
                exercise: exercise,
                email: email,
                image: image,
                
            })
            .returning('id');

        clients.push({
            newClients,
        });

        res.status(HTTP_STATUS.CREATED).json({
            message: 'Client added successfully',
            data: newClients,
        });
    } catch (error) {
        console.error('Error adding client:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error adding client',
        });
    }
});

app.put('/api/clients', async (req, res) => {
    const {
        name,
        member_id,
        phone,
        trainer,
        enrollment_number,
        registration_date,
    } = req.body;

    try {
        const [updatedClient] = await req
            .db('client')
            .where({ member_id })
            .update({
                name: name,
                member_id: member_id,
                phone: phone,
                trainer: trainer,
                enrollment_number: enrollment_number,
                registration_date: registration_date,
               
            })
            .returning('*');

        res.status(200).json({
            message: 'Client updated successfully',
            data: updatedClient,
        });
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({
            message: 'Error updating client',
        });
    }
});
app.delete('/api/clients/:id', async (req, res) => {
    const clientId = req.params.id;

    try {
        const result = await req.db('client').where({ id: clientId }).del();

        if (result) {
            res.status(HTTP_STATUS.OK).json({ message: 'Client deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting client' });
    }
});

app.get('/api/packages', async (req, res) => {
    try {
        const packages = await req.db('package');
        if (HTTP_STATUS.OK)
            return res.send({
                data: packages,
                message: 'packages fetched successfully',
                statusCode: HTTP_STATUS.OK,
            });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching packages',
        });
    }
});

app.post('/api/packages', async (req, res) => {
    const {
        package_name,
        registration_fees,
        monthly_fees,
        fitness_details,
        features
    } = req.body;

    try {
        const newPackages = await req
            .db('package')
            .insert({
                package_name: package_name,
                registration_fees: registration_fees,
                monthly_fees: monthly_fees,
                fitness_details: fitness_details,
                features: features
            })
            .returning('*');

        packages.push({
            newPackages,
        });

        res.status(HTTP_STATUS.CREATED).json({
            message: 'Package added successfully',
            data: newPackages,
        });
    } catch (error) {
        console.error('Error adding package:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error adding package',
        });
    }
});
app.delete('/api/packages/:id', async (req, res) => {
    const packageId = req.params.id;

    try {
        const result = await req.db('package').where({ id: packageId }).del();

        if (result) {
            res.status(HTTP_STATUS.OK).json({
                message: 'Package deleted successfully',
            });
        }
    } catch (error) {
        console.error('Error deleting package:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error deleting package',
        });
    }
});

app.get('/api/trainers', async (req, res) => {
    try {
        const trainers = await req.db('trainers');
        if (HTTP_STATUS.OK)
            return res.send({
                data: trainers,
                message: 'Trainers fetched successfully',
                statusCode: HTTP_STATUS.OK,
            });
    } catch (error) {
        console.error('Error fetching trainers:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching trainers',
        });
    }
});

app.post('/api/trainers', async (req, res) => {
    const {
        name,
        enrollment_number,
        phone,
        dateTime,
        cnic,
        email,
        training_type,
        specialization,
        designation,
        experience,
        location,
        image_url,
    } = req.body;

    try {
        const newTrainers = await req
            .db('trainers')
            .insert({
                name: name,
                phone: phone,
                dateTime: dateTime,
                enrollment_number: enrollment_number,
                cnic: cnic,
                email: email,
                training_type: training_type,
                specialization: specialization,
                designation: designation,
                experience: experience,
                location: location,
                image_url: image_url,
            })
            .returning('id');

        trainers.push({
            newTrainers,
        });

        res.status(HTTP_STATUS.CREATED).json({
            message: 'Trainer added successfully',
            data: newTrainers,
        });
    } catch (error) {
        console.error('Error adding trainer:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error adding trainer',
        });
    }
});

app.delete('/api/trainers/:id', async (req, res) => {
    const trainerId = req.params.id;

    try {
        const result = await req.db('trainers').where({ id: trainerId }).del();

        if (result) {
            res.status(HTTP_STATUS.OK).json({
                message: 'Trainer deleted successfully',
            });
        }
    } catch (error) {
        console.error('Error deleting trainer:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error deleting trainer',
        });
    }
});

app.get('/api/vouchers', async (req, res) => {
    try {
        const vouchers = await req.db('vouchers');
        if (HTTP_STATUS.OK)
            return res.send({
                data: vouchers,
                message: 'Vouchers fetched successfully',
                statusCode: HTTP_STATUS.OK,
            });
    } catch (error) {
        console.error('Error fetching vouchers:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching vouchers',
        });
    }
});

app.post('/api/vouchers', async (req, res) => {
    const {
        code,
        valid_from,
        until_from,
        type,
        value,
        visibility,
        redeem_count,
        max_redeem,
    } = req.body;

    try {
        const newVouchers = await req
            .db('vouchers')
            .insert({
                code: code,
                valid_from: valid_from,
                until_from: until_from,
                type: type,
                value: value,
                visibility:visibility,
                redeem_count:redeem_count,
                max_redeem: max_redeem,
                
            })
            .returning('id');

        vouchers.push({
            newVouchers,
        });

        res.status(HTTP_STATUS.CREATED).json({
            message: 'Voucher added successfully',
            data: newVouchers,
        });
    } catch (error) {
        console.error('Error adding voucher:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error adding voucher',
        });
    }
});

app.delete('/api/vouchers/:id', async (req, res) => {
    const voucherId = req.params.id;

    try {
        const result = await req.db('vouchers').where({ id: voucherId }).del();

        if (result) {
            res.status(HTTP_STATUS.OK).json({
                message: 'Voucher deleted successfully',
            });
        }
    } catch (error) {
        console.error('Error deleting voucher:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error deleting voucher',
        });
    }
});


app.get('/api/banners', async (req, res) => {
    try {
        const banners = await req.db('banners');
        if (HTTP_STATUS.OK)
            return res.send({
                data: banners,
                message: 'Banners fetched successfully',
                statusCode: HTTP_STATUS.OK,
            });
    } catch (error) {
        console.error('Error fetching banners:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching banners',
        });
    }
});


app.post('/api/banners', async (req, res) => {
    const {
        name,
        banner_link,
        short_description,
        detail_description,
        image_url,
    } = req.body;

    try {
        const newBanners = await req
            .db('banners')
            .insert({
                name: name,
                banner_link: banner_link,
                short_description: short_description,
                detail_description: detail_description,
                image_url: image_url,
            })
            .returning('*');

        banners.push({
            newBanners,
        });

        res.status(HTTP_STATUS.CREATED).json({
            message: 'Banner added successfully',
            data: newBanners,
        });
    } catch (error) {
        console.error('Error adding banner:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error adding banner',
        });
    }
});

app.delete('/api/banners/:id', async (req, res) => {
    const bannerId = req.params.id;

    try {
        const result = await req.db('banners').where({ id: bannerId }).del();

        if (result) {
            res.status(HTTP_STATUS.OK).json({
                message: 'Banner deleted successfully',
            });
        }
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Error deleting banner',
        });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
