module reputation_card::reputation_card {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::package::{Self};
    use sui::transfer;
    use std::string::{String, utf8};

    const ENotActive: u64 = 1;
    const EInvalidPoints: u64 = 2;
    const EInvalidStatus: u64 = 3;

    //Structs
    // The Reputation NFT object is tranfered to the customer on sign up
    // Tenure date is the date when the customer signed up
    // The status field is used to close the reputation-related account (active or inactive)
    struct Reputation has key, store {
        id: UID,
        customer_id: address,
        tenure_date: u64,
        reputation_points: u64,
        status: bool,
        image_url: String
    }

     // Admin capability to guard access restricted methods
    struct AdminCap has key, store {
        id: UID
    }

    // One time witness to create the publisher
    struct REPUTATION_CARD has drop {}

    // Functions
    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(REPUTATION_CARD{}, ctx);
    }

    // Called upon contract deployment
    fun init (otw: REPUTATION_CARD, ctx: &mut TxContext) {
        package::claim_and_keep(otw, ctx);
        let admin_cap =AdminCap {id: object::new(ctx)};
        transfer::public_transfer(admin_cap, tx_context::sender(ctx));
    }

    // Mint a new Reputation NFT
    public fun mint_reputation(customer_id: address, tenure_date: u64, ctx: &mut TxContext) {

        let reputation = Reputation {
            id: object::new(ctx),
            customer_id,
            tenure_date,
            reputation_points: 70,
            status: true,
            image_url: utf8(b"https://fortune.com/img-assets/wp-content/uploads/2022/10/Screen-Shot-2022-10-02-at-11.16.42-PM.png?w=1440&q=75")
        };

        transfer::transfer(reputation, customer_id);
    }

    // Update reputation points of a Reputation object
    public fun update_reputation_points(reputation: &mut Reputation, reputation_points: u64) {
        // Ensure the Reputation is not in a closed state
        assert!(reputation.status == true, ENotActive);
        // Ensure the Reputation points are greater than 0
        assert!(reputation_points > 0, EInvalidPoints);

        reputation.reputation_points = reputation.reputation_points + reputation_points;
    }

    // Update the status of a Reputation object
    public fun update_reputation_status(reputation: &mut Reputation, status: bool) {
        // Ensure the status state is different from the current state
        assert!(reputation.status != status, EInvalidStatus);

        reputation.status = status;
    }

    // Accessors
    public fun get_reputation_customer_id(reputation: &Reputation): address {
        reputation.customer_id
    }

    public fun get_reputation_points(reputation: &Reputation): u64 {
        reputation.reputation_points
    }
}