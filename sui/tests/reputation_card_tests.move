#[test_only]
module reputation_card::reputation_card_tests {
    // std lib imports
    use sui::test_scenario;

    use reputation_card::reputation_card::{Self, Reputation, ENotActive, EInvalidPoints, EInvalidStatus};

    // Test address
    const USER: address = @0xABCD;

    #[test]
    fun creates_reputation() {
        let scenario_val = test_scenario::begin(USER);
        let scenario = &mut scenario_val;
        {
            let ctx = test_scenario::ctx(scenario);
            reputation_card::init_for_testing(ctx);
        };

        test_scenario::next_tx(scenario, USER);
        {
            let ctx = test_scenario::ctx(scenario);
            reputation_card::mint_reputation(USER, 1691679730, ctx);
        };

        test_scenario::end(scenario_val);
        }

    #[test]
    fun updates_reputation_points() {
        creates_reputation();

        let scenario_val = test_scenario::begin(USER);
        let scenario = &mut scenario_val;

        test_scenario::next_tx(scenario, USER);
        {
            let reputation = test_scenario::take_from_sender<Reputation>(scenario);
            reputation_card::update_reputation_points(&mut reputation, 100);
            test_scenario::return_to_sender(scenario, reputation);
        };
        
        test_scenario::end(scenario_val);
    }

    #[test]
    fun updates_reputation_status() {
        creates_reputation();

        let scenario_val = test_scenario::begin(USER);
        let scenario = &mut scenario_val;

        test_scenario::next_tx(scenario, USER);
        {
            let reputation = test_scenario::take_from_sender<Reputation>(scenario);
            reputation_card::update_reputation_status(&mut reputation, false);
            test_scenario::return_to_sender(scenario, reputation);
        };
        
        test_scenario::end(scenario_val);
    }

    #[test]
    #[expected_failure(abort_code = ENotActive)]
    fun updates_reputation_points_reputation_inactive() {
        creates_reputation();
        updates_reputation_status();

        let scenario_val = test_scenario::begin(USER);
        let scenario = &mut scenario_val;

        test_scenario::next_tx(scenario, USER);
        {
            let reputation = test_scenario::take_from_sender<Reputation>(scenario);
            reputation_card::update_reputation_points(&mut reputation, 100);
            test_scenario::return_to_sender(scenario, reputation);
        };
        
        test_scenario::end(scenario_val);
    }

    #[test]
    #[expected_failure(abort_code = EInvalidPoints)]
    fun updates_reputation_points_invalid_points() {
        creates_reputation();

        let scenario_val = test_scenario::begin(USER);
        let scenario = &mut scenario_val;

        test_scenario::next_tx(scenario, USER);
        {
            let reputation = test_scenario::take_from_sender<Reputation>(scenario);
            reputation_card::update_reputation_points(&mut reputation, 0);
            test_scenario::return_to_sender(scenario, reputation);
        };
        
        test_scenario::end(scenario_val);
    }

    #[test]
    #[expected_failure(abort_code = EInvalidStatus)]
    fun updates_reputation_status_invalid_status() {
        creates_reputation();

        let scenario_val = test_scenario::begin(USER);
        let scenario = &mut scenario_val;

        test_scenario::next_tx(scenario, USER);
        {
            let reputation = test_scenario::take_from_sender<Reputation>(scenario);
            reputation_card::update_reputation_status(&mut reputation, true);
            test_scenario::return_to_sender(scenario, reputation);
        };
        
        test_scenario::end(scenario_val);
    }

    #[test]
    #[allow(unused_mut_ref)]
    fun get_reputation_customer_id() {
        creates_reputation();

        let scenario_val = test_scenario::begin(USER);
        let scenario = &mut scenario_val;

        test_scenario::next_tx(scenario, USER);
        {
            let reputation = test_scenario::take_from_sender<Reputation>(scenario);
            reputation_card::get_reputation_customer_id(&mut reputation);
            test_scenario::return_to_sender(scenario, reputation);
        };
        
        test_scenario::end(scenario_val);
    }

    #[test]
    #[allow(unused_mut_ref)]
    fun get_reputation_points() {
        creates_reputation();

        let scenario_val = test_scenario::begin(USER);
        let scenario = &mut scenario_val;

        test_scenario::next_tx(scenario, USER);
        {
            let reputation = test_scenario::take_from_sender<Reputation>(scenario);
            reputation_card::get_reputation_points(&mut reputation);
            test_scenario::return_to_sender(scenario, reputation);
        };
        
        test_scenario::end(scenario_val);
    }
 
}
